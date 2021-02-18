import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../store/actions/productActions'
import { RootState } from '../store/store'
import { RouteComponentProps } from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

type ProductList = {
  loading: boolean
  error: string
  products: Product[]
  pages: string
  page: string
}
interface MatchParams {
  keyword: string
  pageNumber: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const HomeScreen: React.FC<MatchProps> = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || '1'

  const dispatch = useDispatch()

  const productList: ProductList = useSelector(
    (state: RootState) => state.productList
  )
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                )
              })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            isAdmin={false}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
