import React, { useEffect, useState, useRef } from "react";

const StatsCounter = () => {
  const stats = [
    {
      title: "Khách hàng thân thiết",
      endValue: 100000,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere atque sed.",
    },
    {
      title: "Sản phẩm đã bán",
      endValue: 999999,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere atque sed.",
    },
    {
      title: "Đánh giá 5*",
      endValue: 700000,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere atque sed.",
    },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  const startAnimation = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // Update every 33.33ms
    const timers = stats.map((stat, index) => {
      const increment = stat.endValue / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= stat.endValue) {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = stat.endValue;
            return newCounts;
          });
          clearInterval(timers[index]);
        } else {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = Math.ceil(current);
            return newCounts;
          });
        }
      }, duration / steps);
    });
  };

  return (
    <div
      ref={ref}
      className="bg-gray-100 container min-h-[70vh] mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px] py-8 "
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-yellow-500 text-xl mb-2">
            VỀ SHOP CỦA CHÚNG TÔI
          </h2>
          <h3 className="text-3xl font-bold text-gray-800">
            Chất Lượng-Uy Tín-Trải Nghiệm Hoàn Hảo
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <h3 className="text-gray-600 font-medium mb-4">{stat.title}</h3>
              <div className="text-yellow-500 text-4xl font-bold mb-4">
                {counts[index].toLocaleString()}
              </div>
              <p className="text-gray-500 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
