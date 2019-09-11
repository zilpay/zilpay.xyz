<template>
  <div :class="b()">
    <div :class="b('header')">
      <h1 :class="b('title')">
        Privacy policy
      </h1>
      <h2 :class="b('sub-title')">
        This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
      </h2>
    </div>
    <div :class="b('column')">
      <div :class="b('content')">
        <p :class="b('lead')">
          Last updated: April 15, 2019 “ZilPay team” (“us”, “we”, or “our”) operates the ZilPay website (the “Service”).
        </p>
        <p :class="b('lead')">
          This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.
        </p>
        <p :class="b('lead')">
          We will not use or share your information with anyone except as described in this Privacy Policy.
        </p>
        <p :class="b('lead')">
          We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at https://zilpay.xyz
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Information Collection And Use
        </h2>
        <p :class="b('lead')">
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information (“Personal Information”) may include, but is not limited to:
        </p>
        <ul :class="b('list')">
          <li>Name</li>
          <li>Email address</li>
        </ul>
        <h2 :class="b('sub-title', { gray: true })">
          Log Data
        </h2>
        <p :class="b('lead')">
          We collect information that your browser sends whenever you visit our Service (“Log Data”). This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Cookies
        </h2>
        <p :class="b('lead')">
          Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer’s hard drive.
        </p>
        <p :class="b('lead')">
          We use “cookies” to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Service Providers
        </h2>
        <p :class="b('lead')">
          We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
        </p>
        <p :class="b('lead')">
          These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Security
        </h2>
        <p :class="b('lead')">
          The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Links To Other Sites
        </h2>
        <p :class="b('lead')">
          Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>
        <p :class="b('lead')">
          We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Children’s Privacy
        </h2>
        <p :class="b('lead')">
          Our Service does not address anyone under the age of 18 (“Children”).
        </p>
        <p :class="b('lead')">
          We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we discover that a child under 18 has provided us with Personal Information, we will delete such information from our servers immediately.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Compliance With Laws
        </h2>
        <p :class="b('lead')">
          We will disclose your Personal Information where required to do so by law or subpoena.
        </p>
        <h2>
          Changes To This Privacy Policy
        </h2>
        <p :class="b('lead')">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p :class="b('lead')">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
        <h2 :class="b('sub-title', { gray: true })">
          Contact Us
        </h2>
        <p :class="b('lead')">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy'
}
</script>

<style lang="scss">
.Privacy {
  background: $background-gradient;

  &__header {
    min-height: 50vh;
    padding: 10%;
  }

  &__content {
    padding-left: 200px;
    padding-right: 200px;
  }

  &__column {
    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: $background;
  }

  &__title {
    font-size: $xll-font;

    @include mobile {
      padding-top: 100px;
      font-size: $md-font;
    }
  }

  &__sub-title {
    font-size: $md-font;

    @include mobile {
      font-size: $sm-font;
    }

    &_gray {
      color: $grey-darker;
    }
  }

  &__lead, &__list {
    margin-bottom: 3rem;
    font-size: $sm-font;
    font-weight: 300;
    color: $white;
  }
}
@media screen and (max-width: $xl-break) {
  .Privacy {
    &__content {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
}
</style>
