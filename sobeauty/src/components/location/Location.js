import './Location.scss';

function Location() {
  return (
    <section className="location">
    <iframe
      title="location"
      className="location__map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.5685767341815!2d28.66514428398619!3d50.262641444993506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c64bef1b4b075%3A0x35c9466a3c02a19c!2sNebesnoji%20Sotni%20St%2C%2048%2C%20Zhytomyr%2C%20Zhytomyrs&#39;ka%20oblast%2C%2010001!5e0!3m2!1sen!2sua!4v1641472011337!5m2!1sen!2sua"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
    </section>
  );
}

export default Location;
