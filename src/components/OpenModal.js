import React from 'react'
import { Button, Modal } from 'antd'
import TableDefault from './TableDefault'

class OpenModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  render() {
    const { columns, cards, title } = this.props
    return (
      <div>
        <Button
          className="buttonDefault"
          type="primary"
          onClick={this.showModal}
        >
          AGREGAR
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1200}
        >
          <TableDefault columns={columns} title={title} cards={cards} />
        </Modal>
      </div>
    )
  }
}

export default OpenModal
