const inputClass =
  "w-full border-b border-black/20 pb-2 text-sm text-black placeholder:text-black/30 outline-none focus:border-black bg-transparent transition-colors";
const labelClass =
  "block mb-1 text-xs tracking-widest uppercase text-black/40";

export type Bank = "농협" | "신한" | "국민" | "기업" | "우체국" | "우리";
export const BANKS: Bank[] = ["농협", "신한", "국민", "기업", "우체국", "우리"];

interface BankTransferFormProps {
  selectedBank: Bank;
  accountNumber: string;
  accountHolder: string;
  onBankChange: (bank: Bank) => void;
  onAccountNumberChange: (v: string) => void;
  onAccountHolderChange: (v: string) => void;
  errors?: {
    accountNumber?: string;
    accountHolder?: string;
  };
}

const BankTransferForm = ({
  selectedBank,
  accountNumber,
  accountHolder,
  onBankChange,
  onAccountNumberChange,
  onAccountHolderChange,
  errors = {},
}: BankTransferFormProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className={labelClass}>은행 선택</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {BANKS.map((bank) => (
            <button
              key={bank}
              type="button"
              onClick={() => onBankChange(bank)}
              className={`border px-4 py-2 text-sm transition-colors ${
                selectedBank === bank
                  ? "border-black bg-black text-white"
                  : "border-black/20 bg-white text-black hover:border-black"
              }`}
            >
              {bank}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className={labelClass}>계좌번호</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => onAccountNumberChange(e.target.value)}
          placeholder="계좌번호를 입력하세요"
          className={inputClass}
        />
        {errors.accountNumber && <p className="mt-1 text-xs text-red-500">{errors.accountNumber}</p>}
      </div>
      <div>
        <label className={labelClass}>입금자명</label>
        <input
          type="text"
          value={accountHolder}
          onChange={(e) => onAccountHolderChange(e.target.value)}
          placeholder="입금자명을 입력하세요"
          className={inputClass}
        />
        {errors.accountHolder && <p className="mt-1 text-xs text-red-500">{errors.accountHolder}</p>}
      </div>
    </div>
  );
};

export default BankTransferForm;
