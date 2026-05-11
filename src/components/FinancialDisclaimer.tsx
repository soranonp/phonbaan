interface Props {
  className?: string;
}

export default function FinancialDisclaimer({ className = "" }: Props) {
  return (
    <div
      role="note"
      className={`mx-auto max-w-3xl rounded-xl border border-gold-soft/60 bg-gold-soft/20 px-5 py-4 text-xs leading-relaxed text-ink-soft ${className}`}
    >
      <p className="mb-1 font-semibold text-ink">
        ข้อจำกัดความรับผิดชอบ
      </p>
      <p>
        ผลลัพธ์เป็นการประมาณการ ไม่ใช่คำแนะนำทางการเงิน/การลงทุน
        ควรปรึกษาที่ปรึกษาการเงินมืออาชีพก่อนตัดสินใจ
      </p>
    </div>
  );
}
