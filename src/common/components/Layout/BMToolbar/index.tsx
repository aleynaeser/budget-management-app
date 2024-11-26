'use client';

import { BMTitle } from '..';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import './bm-toolbar.scss';
import BMIcon from '@components/BMIcon';

interface BMToolbar {
  title: string;
  printComponentRef: React.RefObject<HTMLDivElement>;
}

export default function BMToolbar({ title, printComponentRef }: BMToolbar) {
  return (
    <div className='bm-toolbar'>
      <BMTitle title={title} />

      <ReactToPrint content={() => printComponentRef.current} removeAfterPrint>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <button type='button' className='toolbar-print-button' onClick={handlePrint}>
              <BMIcon icon='bm-arrow-down' size='14' />
              Print
            </button>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
    </div>
  );
}
