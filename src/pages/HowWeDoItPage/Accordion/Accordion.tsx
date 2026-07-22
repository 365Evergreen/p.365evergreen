import type { FC, ReactNode } from "react";
import { useState } from "react";
import styles from "./Accordion.module.css";

const AccordionTitle = 'Accordion';
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion: FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <>
      <h2 className={styles.accordionTitle}>{AccordionTitle}</h2>
      <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className={styles.item}>
            <button
              type="button"
              className={styles.header}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <span>{item.title}</span>

              <span
                className={`${styles.icon} ${
                  isOpen ? styles.iconOpen : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              id={`accordion-panel-${item.id}`}
              className={`${styles.panel} ${
                isOpen ? styles.panelOpen : ""
              }`}
            >
              <div className={styles.content}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default Accordion;