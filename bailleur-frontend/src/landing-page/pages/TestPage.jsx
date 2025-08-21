const TestPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center">Navigation and Footer Test</h1>
      <p className="text-center mt-4 text-gray-600">
        This is a test page to verify that navigation and footer components are working correctly.
      </p>
      <div className="text-center mt-8">
        <p className="text-lg">✅ Navigation is working!</p>
        <p className="text-lg">✅ Footer is working!</p>
        <p className="text-lg">✅ Routing is working!</p>
      </div>
    </div>
  );
};

export default TestPage;