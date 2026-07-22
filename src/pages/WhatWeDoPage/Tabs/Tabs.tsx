import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import contentClient from '../../../content/contentClient'
import styles from './tabs.module.css';


// eslint-disable-next-line react-refresh/only-export-components
export default () => (
  <Tabs className={styles.root}>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);