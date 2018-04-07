import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchReport, exportReport } from '../model/reports';
import { Table } from 'antd';
import styled from 'styled-components';
import { Download } from '../view/icons';

const Card = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const DownloadIcon = styled(Download)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const ScrollView = styled.div`
  overflow: scroll;
  height: 100%;
`;

const DownloadIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const keys = {
  ride: [
    'apptCity',
    'apptEnd',
    'apptStart',
    'apptStreetAddress',
    'created',
    'driverID',
    'id',
    'modified',
    'numMiles',
    'passengerID',
    'pickupCity',
    'pickupStreetAddress',
    'pickupTime',
    'status',
    'totalMinutes',
    'wheelchairVan'
  ],
  driver: [
    'id',
    'firstName',
    'lastName',
    'phone',
    'email',
    'start',
    'end',
    'days'
  ],
  destination: [
    'apptStreetAddress',
    'apptCity',
    'firstName',
    'lastName',
    'apptEnd'
  ],
  client: ['firstName', 'lastName', 'phone', 'email']
};

export class Reports extends Component {
  componentDidMount() {
    this.props.fetchReport(this.props.reportType);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reportType !== this.props.reportType) {
      this.props.fetchReport(nextProps.reportType);
    }
  }

  render() {
    const { reportType } = this.props;

    return (
      <Card>
        <ScrollView>
          <Wrapper>
            <h1>{reportType} reports</h1>
            <DownloadIconWrapper onClick={() => this.props.exportRideReports()}>
              <DownloadIcon />
            </DownloadIconWrapper>
            <ScrollView>
              <Table
                style={{ width: 2500 }}
                dataSource={this.props.reports}
                columns={keys[reportType].map(key => ({
                  key,
                  title: key,
                  dataIndex: key
                }))}
              />
            </ScrollView>
          </Wrapper>
        </ScrollView>
      </Card>
    );
  }
}

export default connect(
  ({ reports, app }) => ({
    reportType: app.reportFilter,
    reports: reports[app.reportFilter],
    rideReports: reports.ride,
    driverReports: reports.driver
  }),
  dispatch => ({
    fetchReport: type => dispatch(fetchReport(type)),
    fetchDriverReports: () => dispatch(fetchReport('driver')),
    fetchRideReports: () => dispatch(fetchReport('ride')),
    fetchDestinationReports: () => dispatch(fetchReport('destination')),
    fetchClientReports: () => dispatch(fetchReport('client')),
    exportDriverReports: () => dispatch(exportReport('driver')),
    exportRideReports: () => dispatch(exportReport('ride')),
    exportDestinationReports: () => dispatch(exportReport('destination')),
    exportClientReports: () => dispatch(exportReport('client'))
  })
)(Reports);
