interface ITableEmptyContent {
  content?: string;
}

export default function TableEmptyContent({ content }: ITableEmptyContent) {
  return <p className='table-empty-content'>There is no data yet.</p>;
}
