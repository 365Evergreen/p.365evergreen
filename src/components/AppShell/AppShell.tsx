import type { PropsWithChildren } from 'react';
import Nav from '../Nav';
import styles from './AppShell.module.scss';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className={styles.shell}>
      <Nav />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
