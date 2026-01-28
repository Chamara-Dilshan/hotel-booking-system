import "./featuredProperties.css";

const FeaturedProperties = () => {
  return (
    <div className="fp">
      <div className="fpItem">
        <img
          src="/images/properties/apart-hotel-ella.jpg"
          alt="Apart Hotel Ella"
          className="fpImg"
        />
        <span className="fpName">Apart hotel </span>
        <span className="fpCity">Ella</span>
        <span className="fpPrice">Starting from Rs12000</span>
        <div className="fpRating">
          <button>4.0</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="/images/properties/rominrich-hikkaduwa.jpg"
          alt="Rominrich Hikkaduwa"
          className="fpImg"
        />
        <span className="fpName">Rominrich</span>
        <span className="fpCity">Hikkaduwa</span>
        <span className="fpPrice">Starting from Rs14000</span>
        <div className="fpRating">
          <button>5.0</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="/images/properties/arcadia-mirissa.jpg"
          alt="Arcadia Mirissa"
          className="fpImg"
        />
        <span className="fpName">Arcadia</span>
        <span className="fpCity">Mirissa</span>
        <span className="fpPrice">Starting from Rs8000</span>
        <div className="fpRating">
          <button>4.0</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="/images/properties/Cinnamon Grand.jpg"
          alt="Cinnamon Grand Hotel"
          className="fpImg"
        />
        <span className="fpName">Cinnamon Grand</span>
        <span className="fpCity">Colombo</span>
        <span className="fpPrice">Starting from Rs45000</span>
        <div className="fpRating">
          <button>4.0</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
