import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

type paginateProps = {
  pages: string
  page: string
  keyword: string
  isAdmin: boolean
}

const Paginate: React.FC<paginateProps> = ({
  pages = '',
  page = '',
  keyword = '',
  isAdmin = false,
}): any => {
  return (
    Number(pages) > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={Number(x + 1) === Number(page)}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
