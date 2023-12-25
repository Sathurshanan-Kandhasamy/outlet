import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Outlet',
  description: 'We sell the best furnitures for low price',
  keywords: 'furnitures, buy furnitures, low price furnitures',
};

export default Meta;
