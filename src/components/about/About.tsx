const About = () => {
  return (
    <section className="py-16 px-6 lg:px-0 bg-white dark:bg-gray-800">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="About us"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We are dedicated to providing high-quality courses that help you
            grow your skills and achieve your goals. Our platform connects
            learners with industry experts for practical, real-world knowledge.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Our mission is to empower learners to succeed through interactive
            learning experiences, insightful success stories, and hands-on
            projects.
          </p>
          <a
            href="/courses"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
