import React from 'react'
import { Helmet } from 'react-helmet'

type MetaProps = {
  title?: string
  description?: string
  keywords?: string
}

const Meta: React.FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Welcome to Music Shop',
  description: 'Best products in the cheapest prices',
  keywords: 'Guitars, microphones, drums',
}

export default Meta
