import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>
                    <Link className="nav-link" to={title}>
                        {title.toUpperCase()}
                    </Link>
                </span>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4).map((product) =>
                        <ProductCard key={product.id} product={product}></ProductCard>
                    )
                }
            </div>
        </div>
    )
}

export default CategoryPreview;