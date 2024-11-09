export default () => {
  const footerNavs = [
    { href: "javascript:void()", name: "About" },
    { href: "javascript:void()", name: "Blog" },
    { href: "javascript:void()", name: "Team" },
    { href: "javascript:void()", name: "Careers" },
    { href: "javascript:void()", name: "Support" },
  ];

  return (
    <footer className="bg-[#f9f9f9] text-gray-500 py-8 ">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 block">
        <div className="text-center mb-8">
          <img src="src/assets/logo.png" alt="Logo" className="w-60 mx-auto" />
          <p className="mt-4 text-sm md:text-base leading-relaxed">
            <span className="font-bold text-md">
              {" "}
              Stay Connected with Roamly{" "}
            </span>
            Explore, share, and discover unforgettable travel experiences with
            Roamly. Follow us on social media to stay updated with the latest
            travel tips, adventures, and blog posts. Whether you're planning
            your next trip or reminiscing about your favorite journey, Roamly is
            here to inspire your wanderlust.
          </p>
        </div>

        <ul className="flex justify-center space-x-6 mb-8">
          {footerNavs.map((item, idx) => (
            <li key={idx} className="hover:text-gray-800">
              <a href={item.href} className="text-sm md:text-base">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center border-t pt-6 mt-8">
          <p className="text-sm text-center">
            © 2024 Roamly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
