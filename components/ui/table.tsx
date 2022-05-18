import React, { Fragment, ReactNode } from 'react'
import styled from 'styled-components'
import { Container, Text } from '.'
import { v4 as uuid } from 'uuid';
import { getColor } from '../../utils/theme';

interface TableProps {
  rows?: unknown[],
  options?: {
    name: string
    label: string
    flex?: string,
    onlyOnParent?: boolean,
    sort?: () => void,
    toggleSort?: () => void,
    layout: (value: any) => JSX.Element,
  }[]
  customOptions?: {
    headerLayout?: ReactNode
    rowLayout?: (value: any) => JSX.Element,
  }
}

const StyledTable = styled(Container)`
  position: relative;
  flex-direction: column;
  align-items: stretch;
  .table-body-container {
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    overflow: auto;
    &::-webkit-scrollbar {

    }
  }
  .nested-rows-container {
    flex-direction: column;
  }
  .nested-row-container, .nested-rows-container {
    width: 100%
  }
  .cell-container {
    justify-content: flex-start;
  }
  .row-wrapper-container {
    padding:  4px 32px;
    flex-direction: column;
    align-items: stretch;
  }
  .header-row-wrapper-container {
    border-radius: 24px 24px 0px 0px;
    flex-direction: column;
    background: ${getColor('clearTransparency')};
    align-items: stretch;
    padding:  12px 32px;
  }
  .row-wrapper-container:nth-of-type(2n) {
    background: ${getColor('clearTransparency')};
  }
  .nested-rows-container {
    padding:  12px 0;
  }
  .nested-row-container {
    padding:  8px 0;
  }
`

export const Table = ({rows, options, customOptions}: TableProps) => {

  const renderRow = (row:unknown, rowIndex?:number) => {
    if (Array.isArray(row)) {
      return (
        <Container className="nested-rows">
          {
            row.map((nestedRow, rowIndex) => {
              return <Container key={uuid()} className="nested-row">{renderRow(nestedRow, rowIndex)}</Container>
            })
          }
        </Container>
      )
    }

    if (options) {
      return options.map(({layout, onlyOnParent, flex}) => {
        return <Container key={uuid()} flex={flex || '1'} className="cell">
          {
            !onlyOnParent 
              ? layout(row)
              : rowIndex === 0 && layout(row)
          }
        </Container>
      })
    }
  }

  const renderTable = () => {
    return (
      <>
        <Container className="header-row-wrapper">
          <Container className="header row">
            {options?.map(({label, flex}) => {
              return <Container key={uuid()} flex={flex || '1'} className="cell"><Text textType='p'>{label}</Text></Container>
            })}
          </Container>
            {customOptions && customOptions.headerLayout && <Container className="cell">{customOptions.headerLayout}</Container>}
        </Container>
        <Container className="table-body">
          {rows?.map((row) => {
            return (
              <Container className="row-wrapper" key={uuid()}>
                <Container className="row">{renderRow(row)}</Container> 
                {customOptions && customOptions.rowLayout && <Container className="custom-row">{customOptions.rowLayout(row)}</Container>}
              </Container>
              )
          })}
        </Container>
      </>
    )

  }

  return <StyledTable height='100%' maxWidth='100%' className="table">{renderTable()}</StyledTable>
}

export default Table