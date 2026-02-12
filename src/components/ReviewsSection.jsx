const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Anjali Perera",
      role: "Verified Buyer",
      comment: "The quality of the fabric is amazing! I bought a summer dress and it fits perfectly. Highly recommended.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Kasun Jayawardena",
      role: "Verified Buyer",
      comment: "Best customer service I've experienced. The delivery was fast and the shirt looks even better in person.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Dilini Silva",
      role: "Verified Buyer",
      comment: "Superb elegant designs. LUXE ATTIRE is now my go-to place for office wear.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Our Happy Customers</p>
          <h2 className="text-4xl font-serif font-medium text-black">Customer Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-1 text-yellow-500 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed">
                "{review.comment}"
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-gray-400 text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};