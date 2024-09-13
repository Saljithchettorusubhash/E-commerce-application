import React from 'react';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  category: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  category,
  price,
}) => {
  return (
    <div className="product-card w-full max-w-lg bg-white p-1 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ height: '600px' }}> {/* Increased the height to 500px */}
      <a  target="_self" style={{ textDecoration: 'none' }}>
        <img
          src={imageUrl}
          alt={name}
          className="block w-full h-[80%] object-cover rounded-lg lazyload"
          loading="lazy"
          style={{ height: '500px', objectFit: 'cover' }}  
        />
        <div className="mt-2">
          <h4 className="font-semibold text-lg text-black">{name}</h4>
          <p className="text-gray-600 text-sm">{category}</p>
          <p className="text-xl font-bold text-black mt-2">{price}</p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
