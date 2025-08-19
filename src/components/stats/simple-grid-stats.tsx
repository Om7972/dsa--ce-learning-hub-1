const SimpleGridStats = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-semibold lg:text-6xl text-foreground font-display">
          Platform Impact
        </h1>
        <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
          Empowering students with comprehensive DSA learning experiences and proven success outcomes
        </p>
        <div className="grid gap-10 pt-9 md:grid-cols-3 lg:gap-0 lg:pt-20">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Active learners on our platform
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-accent">15,000+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              Students Learning
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Daily problem-solving activity
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-accent">500+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              Problems Solved Daily
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Student success rate
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-accent">95%</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              Placement Rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SimpleGridStats };