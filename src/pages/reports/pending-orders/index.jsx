import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';

const PendingOrdersReportPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Reporte de órdenes pendientes"
        isLoading={false}
      ></PageHeader>
    </PageContainer>
  );
};

export default PendingOrdersReportPage;
