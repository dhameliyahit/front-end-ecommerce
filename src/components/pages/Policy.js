import React from 'react'
import Layout from '../layout/Layout'

const Policy = () => {
  return (
   <Layout title={'Term and condition'}>
      <div className="container" style={{ marginTop: 50 }}>
        <div className="text-center" style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 5 }}>
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. This privacy policy explains the personal data we process, how we process it, and for what purposes.</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <hr />
          <h2>1. Information We Collect</h2><hr />
          <p>We collect various types of information in connection with the services we provide, including:</p>
          <ul>
            <li>Personal information you provide directly to us.</li>
            <li>Information collected automatically as you use our services.</li>
          </ul>
         <hr /> <h2>2. How We Use Information</h2><hr />
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services.</li>
            <li>Communicate with you about updates, offers, and promotions.</li>
            <li>Ensure security and prevent fraud.</li>
          </ul>
         <hr /> <h2>3. Sharing of Information</h2><hr />
          <p>We do not share your personal information with third parties except in the following cases:</p>
          <ul>
            <li>With your consent.</li>
            <li>For external processing by trusted partners.</li>
            <li>For legal reasons and to comply with applicable laws.</li>
          </ul>
          <hr /><h2>4. Your Privacy Rights</h2><hr />
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of receiving marketing communications.</li>
            <li>Request a copy of your personal data.</li>
          </ul>
         <hr /> <h2>5. Changes to This Privacy Policy</h2> <hr />
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on our website.</p>
         <hr /> <h2>6. Contact Us</h2> <hr />
          <p>If you have any questions about this privacy policy, please contact us:</p>
          <ul>
            <li>Email: ecommercebyhd@gmail.com</li>
            <li>Phone: (123) 456-7890</li>
          </ul>
          <hr />
        </div>
      </div>


   </Layout>
  )
}

export default Policy
