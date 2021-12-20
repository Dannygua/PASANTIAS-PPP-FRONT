import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

class TableDefault extends React.Component {
  render() {
    const { columns, title, dataSource } = this.props
    return (
      <div data-test="Table">
        <div className="Table-Container">
          <h1>{title}</h1>

          {<Table columns={columns} dataSource={dataSource} />}
        </div>
        <style jsx>{`
          .Table-Container {
            margin-left: 3%;
            margin-right: 3%;
          }
        `}</style>
      </div>
    )
  }
}

TableDefault.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
}

export default TableDefault
