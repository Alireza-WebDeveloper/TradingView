import { AdvancedChart } from 'react-tradingview-embed';

const CandleChart = () => {
  return (
    <div className="h-screen ">
      <AdvancedChart
        widgetProps={{
          symbol: 'BINANCE:BTCUSDT',
          interval: '60',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#000000',
          allow_symbol_change: true,
          hide_top_toolbar: false,
          withdateranges: true,
          height: '100%',
          width: '100%',
        }}
        widgetPropsAny={{
          autosize: true,
        }}
      />
    </div>
  );
};

export default CandleChart;
