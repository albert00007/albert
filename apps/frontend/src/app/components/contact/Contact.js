import './Contact.css'

export default function Contact() {
  return(
    <div className="container_contact" id='contact'>
      <div className="section-inner contact-card">
        <h2>Get in Touch with MicroStateDev</h2>
        <h4>Let’s Build the Future of Your Business Together</h4>
        <p>
          Ready to transform your ideas into scalable digital products? Whether
          you have a specific project in mind or need expert technical
          consultation, our team at MSD (MicroStateDev) is here to engineer the
          right solution for you.
        </p>

        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a className="contact-value" href="mailto:tech@microstatedev.com">
              tech@microstatedev.com
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone:</span>
            <a className="contact-value" href="tel:+37441355605">
              +374 41 355 605
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}