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

export class Reports extends Component {
  componentDidMount() {
    this.props.fetchDriverReports();
    this.props.fetchRideReports();
  }
  render() {
    const keys = [
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
    ];

    const driverKeys = [
      'id',
      'firstName',
      'lastName',
      'phone',
      'email',
      'start',
      'end',
      'days'
    ];

    return (
      <Card>
        <ScrollView>
          <Wrapper>
            <h1>Ride Reports</h1>
            <DownloadIconWrapper onClick={() => this.props.exportRideReports()}>
              <DownloadIcon />
            </DownloadIconWrapper>
            <ScrollView>
              <Table
                style={{ width: 2500 }}
                dataSource={this.props.rideReports}
                columns={keys.map(key => ({
                  key,
                  title: key,
                  dataIndex: key
                }))}
              />
            </ScrollView>
          </Wrapper>
          <Wrapper>
            <h1>Driver Reports</h1>
            <DownloadIconWrapper
              onClick={() => this.props.exportDriverReports()}
            >
              <DownloadIcon />
            </DownloadIconWrapper>
            <ScrollView>
              <Table
                style={{ width: 2500 }}
                dataSource={this.props.driverReports}
                columns={driverKeys.map(key => ({
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
  ({ reports }) => ({
    rideReports: reports.ride,
    driverReports: reports.driver
  }),
  dispatch => ({
    fetchDriverReports: () => dispatch(fetchReport('driver')),
    fetchRideReports: () => dispatch(fetchReport('ride')),
    exportDriverReports: () => dispatch(exportReport('driver')),
    exportRideReports: () => dispatch(exportReport('ride'))
  })
)(Reports);
