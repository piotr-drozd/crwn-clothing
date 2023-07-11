import DirectoryItem from '../directory-item/directory-item.component';

import './category-menu.styles.scss'

const CategoryMenu = ({ categories }) => {
    return (
        <div className="categories-container">
            {categories.map((category) => {
                return (
                    <DirectoryItem key={category.id} category={category}></DirectoryItem>
                )
            })}
        </div>
    )
}

export default CategoryMenu