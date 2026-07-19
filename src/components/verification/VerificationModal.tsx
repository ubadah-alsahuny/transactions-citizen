import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import type { VerificationResult } from '../../types/verification.types';
import { LoadingCircle } from '../ui/loading-circle/LoadingCircle';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  result: VerificationResult | null;
  isLoading: boolean;
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 1000,
  overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '16px',
};

const modalStyle: React.CSSProperties = {
  width: '100%', maxWidth: '600px',
  borderRadius: '24px', backgroundColor: '#fff',
  padding: '20px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  marginBottom: '12px',
};

export default function VerificationModal({ isOpen, onClose, result, isLoading }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
            التحقق من صحة المعاملة
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', borderRadius: '50%', display: 'flex',
            }}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: '12px' }}>
            <LoadingCircle />
            <span style={{ color: '#6b7280' }}>جارٍ التحقق...</span>
          </div>
        ) : result ? (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              borderRadius: '16px', padding: '12px', marginBottom: '12px',
              backgroundColor: result.verification.status === 'verified' ? '#f0fdf4' : '#fef2f2',
              color: result.verification.status === 'verified' ? '#166534' : '#991b1b',
            }}>
              {result.verification.status === 'verified' ? (
                <FaCheckCircle size={28} />
              ) : (
                <FaTimesCircle size={28} />
              )}
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700 }}>
                  {result.verification.status === 'verified' ? 'المعاملة موثقة ✓' : 'فشل التحقق ✗'}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                  {result.verification.status === 'verified'
                    ? 'جميع فحوصات سلسلة الكتل ناجحة'
                    : 'بعض فحوصات سلسلة الكتل فشلت'}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280', marginBottom: '6px' }}>الفحوصات</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {result.verification.checks.map(check => (
                  <div
                    key={check.key}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderRadius: '12px', padding: '6px 12px', fontSize: '14px',
                      backgroundColor: check.passed ? '#f0fdf4' : '#fef2f2',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: check.passed ? '#16a34a' : '#dc2626' }}>
                        {check.passed ? '✓' : '✗'}
                      </span>
                      <span style={{ color: check.passed ? '#166534' : '#991b1b' }}>
                        {check.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: check.passed ? '#16a34a' : '#dc2626' }}>
                      {check.value || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {result.verification.issues.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280', marginBottom: '6px' }}>المشكلات</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {result.verification.issues.map((issue, idx) => (
                    <div
                      key={`${issue.code}-${idx}`}
                      style={{
                        borderRadius: '12px', backgroundColor: '#fef2f2',
                        padding: '6px 12px', fontSize: '14px', color: '#991b1b',
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>{issue.code}</span>: {issue.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              سلسلة الكتل: {result.chain.isValid ? 'سليمة' : 'غير سليمة'} | أحداث الإثبات:{' '}
              {result.chain.proofEventsCount}
            </div>
          </>
        ) : (
          <div style={{ padding: '32px 0', textAlign: 'center', color: '#6b7280' }}>
            حدث خطأ أثناء التحقق
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
