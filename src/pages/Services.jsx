import './Services.css';

function Services() {
  const services = [
    {
      title: 'Satış Danışmanlığı',
      description: 'Profesyonel ekibimizle size en uygun daireyi bulmanızda yardımcı oluyoruz.',
      icon: '🏢'
    },
    {
      title: 'Kiralama Hizmetleri',
      description: 'Kısa ve uzun dönem kiralama seçenekleri ile hizmetinizdeyiz.',
      icon: '🔑'
    },
    {
      title: 'Yatırım Danışmanlığı',
      description: 'Gayrimenkul yatırımlarınızda size rehberlik ediyoruz.',
      icon: '📈'
    },
    {
      title: 'Hukuki Destek',
      description: 'Tüm yasal süreçlerde yanınızdayız.',
      icon: '⚖️'
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Hizmetlerimiz</h1>
        <p>Size nasıl yardımcı olabiliriz?</p>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
