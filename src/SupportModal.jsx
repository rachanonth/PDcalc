import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';
import './SupportModal.css';

const PROMPTPAY_ID = import.meta.env.VITE_PROMPTPAY_ID ?? '';
const AMOUNT = Number(import.meta.env.VITE_PROMPTPAY_AMOUNT ?? 20);

const SupportModal = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !PROMPTPAY_ID) return;

    const payload = generatePayload(PROMPTPAY_ID, { amount: AMOUNT });
    QRCode.toCanvas(canvasRef.current, payload, {
      width: 220,
      margin: 2,
      color: { dark: '#1a365d', light: '#ffffff' },
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="support-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-title"
      onClick={onClose}
    >
      <div className="support-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="support-close"
          onClick={onClose}
          aria-label="ปิด"
        >
          ✕
        </button>

        <div className="support-icon" aria-hidden="true">☕</div>

        <h2 id="support-title" className="support-title">สนับสนุน Peddose</h2>
        <p className="support-subtitle">Support Peddose</p>

        <div className="support-qr-wrapper">
          {PROMPTPAY_ID ? (
            <canvas ref={canvasRef} className="support-canvas" />
          ) : (
            <div className="support-qr-placeholder">QR not configured</div>
          )}
        </div>

        <p className="support-amount">ยินดีรับทุกจำนวน · Any amount welcome</p>

        <p className="support-caption">
          สแกน PromptPay เพื่อสนับสนุน
          <br />
          ทุกยอดสนับสนุนจะนำไปเป็นค่า Server
          <br />
          และพัฒนาฐานข้อมูลยาให้ดียิ่งขึ้น
        </p>
        <p className="support-caption-en">
          Every support goes towards server costs
          <br />
          and improving the drug database.
        </p>
      </div>
    </div>,
    document.body
  );
};

export default SupportModal;
