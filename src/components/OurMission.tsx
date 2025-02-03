const OurMission = () => {
  return (
    <div>
      <div className="container mx-auto p-6 font-primaryFront">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Mission & Vision
            </h1>
            <p className="text-gray-600  mb-4">
              At Note & Nest, our mission is to provide high-quality, stylish,
              and affordable stationery products that inspire creativity and
              organization. We are committed to offering a diverse range of
              stationery items that cater to students, professionals, and
              artists alike. Through exceptional customer service and an easy
              shopping experience, we aim to make stationery shopping enjoyable
              and accessible for everyone.
            </p>
          </div>
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <h2 className="text-lg font-semibold text-teal-600 mb-2">
              WHO WE ARE
            </h2>
            <p className="text-gray-600">
              we specialize in providing a wide range of high-quality stationery
              products that cater to students, professionals, artists, and
              businesses. Our collection includes notebooks, pens, planners, art
              supplies, office essentials, and customized stationery items. We
              focus on delivering stylish, functional, and eco-friendly products
              that inspire creativity, productivity, and organization. With a
              seamless online shopping experience, fast delivery, and excellent
              customer service, we make it easy for stationery lovers to find
              everything they need in one place.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-teal-600 mb-2">
              WHAT WE DO
            </h2>
            <p className="text-gray-600">
              We are a passionate team of stationery enthusiasts dedicated to
              bringing you the best stationery products with a touch of
              creativity and innovation. Founded with the vision of making
              stationery shopping enjoyable and accessible, [Your Stationery
              Shop Name] is more than just a store—it’s a community for
              stationery lovers. Whether you're a student looking for study
              essentials, an artist seeking inspiration, or a professional in
              need of premium office supplies, we are here to provide
              top-quality products that meet your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
