import React, { PureComponent } from 'react'
import { Row, Container } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { DECIMALS } from '../../config'
import { TypeChooser } from "react-stockcharts/lib/helper"
import Chart from './Chart';
import { getChartData } from "../../utils/chart"
import { getFromLS } from "../../utils/localStorage"
import { chartSizeUpdate } from "../../actions/chartSizeActions"

const chartWidth = getFromLS("chartWidth") || window.innerWidth - window.innerWidth*50.5/100;
const chartHeight = getFromLS("chartHeight") || window.innerHeight - window.innerHeight*46/100;

class ChartDesk extends PureComponent {
  
  constructor(){
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount(prevProps, prevState) {
      this.props.chartSizeUpdate({height: chartHeight, width: chartWidth});
  }

  componentDidUpdate(prevProps, prevState) {
      if(this.props.trades !== prevProps.trades){
        this.setState({data:getChartData(this.props.trades)})
      }  
  }

	render () {
		return (  
			<div className="grid_block">
        <div className="grid_header">
            <div className="grid_title">Chart</div>
        </div>
        <div className="grid_subtitle_title">
          <Container>
            <Row>
              <div className="subtitle_block right_border">
                Price: ${(this.props.lastPrice / DECIMALS).toFixed(2)}
              </div>
              <div className="right_border subtitle_block ">
                Spot: ${(this.props.spotPrice / DECIMALS).toFixed(2)}
              </div>
            </Row>
          </Container>
        </div>
        <div className="grid_content chart_content" id="pricechart">
            <TypeChooser>{ 
                type => {  
                  if(this.state.data && this.state.data.length>0) {
                    return(
                      <Chart type={type} pnl={ null} position={null} data={this.state.data} height={this.props.chartSize.height}  width={this.props.chartSize.width} />
                    );
                  }
                }
              }
            </TypeChooser>
        </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
  trades:state.trades,
  enabledMetamask: state.enabledMetamask,
  lastPrice: state.lastPrice,
  spotPrice: state.spotPrice,
  chartSize: state.chartSize
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ chartSizeUpdate }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ChartDesk)

