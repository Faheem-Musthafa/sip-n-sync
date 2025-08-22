import React, { useMemo, useState } from 'react';
import { Event } from '../../lib/types.enhanced';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { eventsService } from '../../services/events';
import { uploadPaymentProof } from '../../services/uploads';

type FormState = {
	name: string;
	email: string;
	phone?: string;
	message?: string;
	proofFile?: File | null;
	proofUrl?: string;
};

interface Props {
	isOpen: boolean;
	event: Event | null;
	onClose: () => void;
	onSuccess?: () => void;
}

export function EventRegistrationModal({ isOpen, event, onClose, onSuccess }: Props) {
		const initial: FormState = useMemo(() => ({ name: '', email: '', phone: '', message: '', proofFile: null, proofUrl: undefined }), []);
	const [form, setForm] = useState<FormState>(initial);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const reset = () => {
		setForm(initial);
		setError(null);
	};

	const validate = () => {
		if (!form.name.trim()) return 'Name is required';
		if (!form.email.trim()) return 'Email is required';
		const emailOk = /.+@.+\..+/.test(form.email);
		if (!emailOk) return 'Enter a valid email';
		if (form.phone && form.phone.length > 20) return 'Phone looks too long';
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const v = validate();
		if (v) {
			setError(v);
			return;
		}
			if (!event) return;

		setLoading(true);
		try {
				// If user selected a file, upload first
				let uploadedUrl: string | undefined;
				if (form.proofFile) {
					uploadedUrl = await uploadPaymentProof(form.proofFile);
				}
			const ok = await eventsService.registerForEvent(event.id, {
				attendee: { name: form.name.trim(), email: form.email.trim(), phone: form.phone?.trim() || undefined },
					message: form.message?.trim() || undefined,
					paymentProofUrl: uploadedUrl,
			});
			if (ok) {
				onSuccess?.();
				reset();
				onClose();
			} else {
				setError('Registration failed. Please try again.');
			}
			} catch (err) {
				const msg = err instanceof Error ? err.message : 'Registration failed.';
				setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={() => { reset(); onClose(); }} title={event ? `Register: ${event.title}` : 'Register'} size="md">
			<form onSubmit={handleSubmit} className="space-y-5">
				{/* Event summary */}
				{event && (
					<div className="rounded-xl bg-cream-white p-4 text-sm text-dark-roast/80">
						<div className="font-medium text-dark-roast">{event.title}</div>
						<div className="opacity-80">{new Date(event.date).toLocaleDateString()} • {event.time} • {event.location}</div>
					</div>
				)}

				{/* Fields */}
			<div className="grid grid-cols-1 gap-4">
					<div>
						<label className="block text-sm font-medium text-dark-roast mb-1">Full name *</label>
						<input
							type="text"
							value={form.name}
							onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
							className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-warm-amber focus:border-warm-amber outline-none"
							placeholder="John Doe"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-dark-roast mb-1">Email *</label>
						<input
							type="email"
							value={form.email}
							onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
							className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-warm-amber focus:border-warm-amber outline-none"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-dark-roast mb-1">Phone *</label>
						<input
							type="tel"
							value={form.phone}
							onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
							className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-warm-amber focus:border-warm-amber outline-none"
							placeholder="+91 98765 43210"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-dark-roast mb-1">Message (optional)</label>
						<textarea
							value={form.message}
							onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
							className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-warm-amber focus:border-warm-amber outline-none min-h-[96px]"
							placeholder="Any notes or questions?"
						/>
					</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-dark-roast mb-2">Pay via UPI QR</label>
										<div className="rounded-xl border-2 border-dashed border-gray-300 p-3 flex items-center justify-center bg-white">
											{/* Replace with your static QR image in /public */}
											<img src="/Or.png" alt="Payment QR" className="max-h-48 object-contain" />
										</div>
										<p className="text-xs text-dark-roast/60 mt-2">Scan and pay, then upload the payment screenshot.</p>
									</div>
									<div>
										<label className="block text-sm font-medium text-dark-roast mb-2">Upload payment screenshot *</label>
										<input
											type="file"
											accept="image/png,image/jpeg,image/jpg,image/webp"
											onChange={(e) => setForm((s) => ({ ...s, proofFile: e.target.files?.[0] || null }))}
											className="block w-full text-sm text-dark-roast file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coffee-brown file:text-white hover:file:bg-coffee-brown/90"
										/>
										{form.proofFile && (
											<p className="text-xs text-dark-roast/60 mt-2">Selected: {form.proofFile.name}</p>
										)}
									</div>
								</div>
				</div>

				{error && (
					<div className="text-red-600 text-sm">{error}</div>
				)}

				<div className="flex items-center justify-end gap-3 pt-2">
					<Button type="button" variant="outline" onClick={() => { reset(); onClose(); }} disabled={loading}>
						Cancel
					</Button>
					<Button type="submit" loading={loading}>
						Submit Registration
					</Button>
				</div>
			</form>

			<p className="text-xs text-dark-roast/60 mt-4">
				By submitting, you consent to us storing your details for this event and contacting you regarding updates.
			</p>
		</Modal>
	);
}

export default EventRegistrationModal;
