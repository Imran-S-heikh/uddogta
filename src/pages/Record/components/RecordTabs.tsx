import { useRecoilState } from "recoil";
import ButtonRipple from "@/components/buttons/ButtonRipple.component";
import { TabState } from "@/state/app.atom";
import { ActionType } from "@/types/app.type";
import clsx from "clsx";

function RecordTabs() {
  const [tab, setTab] = useRecoilState(TabState);
  return (
    <div className="Bgc(#082032) D(f) Gp(2rem) P(1rem) Bdrs(8px) Mt(2rem) ">
      <ButtonRipple
        onClick={() => setTab(ActionType.EXPENSE)}
        className={clsx(
          "Fx(1) H(4rem) Bdrs(4px) Fz(1.8rem) Fw(b) Bgc(#092942) Trsdu(300ms) C(white)",
          tab === ActionType.EXPENSE && "Bgc(#ff4c29)"
        )}
      >
        Expense
      </ButtonRipple>
      <ButtonRipple
        onClick={() => setTab(ActionType.INCOME)}
        className={clsx(
          "Fx(1) Fz(1.6rem) Bdrs(4px) Fz(1.8rem) Fw(b) C(white) Bgc(#092942) Trsdu(300ms)",
          tab === ActionType.INCOME && "Bgc(#ff4c29)"
        )}
      >
        Income
      </ButtonRipple>
    </div>
  );
}

export default RecordTabs;
