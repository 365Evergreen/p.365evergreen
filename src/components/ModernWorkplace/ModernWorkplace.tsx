import type { JSXElement } from "@fluentui/react-components";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import styles from './ModernWorkplace.module.css';

export const ModernWorkplace = (): JSXElement => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div className={styles.accordionPanel}>
          <div className={styles.panelColumn}><p>Accelerate AI innovation by securely migrating and modernizing your IT estate.</p>
          </div>
          <div className={styles.panelColumn}><img className={styles.panelImage} src="https://cdn.365evergreen.com/content/media/modern-workplace.webp" alt="Modern Workplace" /></div>
        </div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
export { ModernWorkplace as default };