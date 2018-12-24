import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import CustomTable from '../../../../components/CustomTable';
import TableFilter from '../TableFilter';

const ButtonGroup = Button.Group;

const getData = (length) => {
  return Array.from({ length }).map((item, index) => {
    return {
      id: index + 1,
      builder: `12022123${index}`,
      name: '淘小宝',
      description: '淘宝 Rax 项目构建器',
      createTime: `2018-06-${index + 1}`,
      executionTime: `2018-06-${index + 1}`,
      approvalData: `2018-06-${index + 1}`,
      officialVersion: `1.2.${index}`,
      grayVersion: `2.2.${index}`,
      state: '成功',
    };
  });
};

export default class BuilderTable extends Component {
  state = {
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData(10);
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => {
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handleSubmit = (len) => {
    this.fetchData(len);
  };

  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.circle} />
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div style={styles.oper}>
        <a href="/">查看</a>
      </div>
    );
  };

  columnsConfig = () => {
    return [
      {
        title: '构建对象',
        dataIndex: 'builder',
        key: 'builder',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '责任人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '最后执行时间',
        dataIndex: 'executionTime',
        key: 'executionTime',
      },
      {
        title: '正式版本',
        dataIndex: 'officialVersion',
        key: 'officialVersion',
      },
      {
        title: '灰度版本',
        dataIndex: 'grayVersion',
        key: 'grayVersion',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
      },
      {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
      },
    ];
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <IceContainer>
        <div style={styles.tableHead}>
          <div style={styles.tableTitle}>构建器</div>
          <ButtonGroup size="large">
            <Button type="primary" onClick={() => this.handleSubmit(10)}>
              已发布
            </Button>
            <Button type="primary" onClick={() => this.handleSubmit(3)}>
              开发中
            </Button>
            <Button type="primary" onClick={() => this.handleSubmit(8)}>
              我的
            </Button>
          </ButtonGroup>
        </div>
        <TableFilter handleSubmit={() => this.handleSubmit(5)} />
        <CustomTable
          columns={this.columnsConfig()}
          dataSource={data}
          isLoading={isLoading}
        />
      </IceContainer>
    );
  }
}

const styles = {
  tableHead: {
    margin: '0 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
};
