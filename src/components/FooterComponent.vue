<template>
  <div class="footer-container">
    <div class="first-sec">
      <section class="foot-sec1">
        <div>
          <RouterLink to="/">
            <img class="foot-img" src="/images/Logo_no BG red.jpg" />
          </RouterLink>
        </div>
        <div>
          <p class="first-sec-txt">
            Viverra gravida morbi egestas facilisis tortor netus non duis tempor.
          </p>
        </div>

        <div>
          <div class="social-icons">
            <i class="icons">
              <img class="icons" src="/icons/fb.png" />
            </i>

            <i class="icons">
              <img class="icons" src="/icons/ig.png" />
            </i>

            <i class="icons">
              <img class="icons" src="/icons/whatsapp.png" />
            </i>
            <i class="icons">
              <img class="icons" src="/icons/tiktok.png" />
            </i>
          </div>
        </div>
      </section>

      <section class="foot-sec2" id="sec2">
        <div>
          <h2 class="sec2-header">Pages</h2>
        </div>
        <div class="page-list">
          <RouterLink to="/" class="pages"> Home</RouterLink>
          <RouterLink to="/menu" class="pages"> Menu</RouterLink>
          <RouterLink to="/reservation" class="pages">Reservation</RouterLink>
          <RouterLink to="/aboutUs" class="pages"> About Us</RouterLink>
          <RouterLink to="/contactUs" class="pages">Contact Us</RouterLink>
        </div>
      </section>
      <div class="info-get">
        <section class="foot-sec3" id="sec3">
          <div>
            <h2 class="sec2-header">Information</h2>
          </div>
          <div class="page-list">
            <RouterLink to="/aboutUs" class="pages"> About Us</RouterLink>
            <RouterLink to="/contactUs" class="pages">Private Catering</RouterLink>
            <p class="info">+233 54 968 4848</p>
          </div>
        </section>

        <section class="foot-sec4" id="sec4">
          <div>
            <h2 class="sec2-header">Get In Touch</h2>
          </div>
          <div>
            <p class="info">G123/2 Kowe-Jornaa <br />Opposite the La Comm. Bank</p>
            <p class="info">+233 54 968 4848</p>
          </div>
        </section>
      </div>
    </div>

    <div class="me">Developed by Bright</div>
  </div>
</template>
<script>
export default {}
</script>

<script setup></script>
<style>
.footer-container {
  width: 100%;
  height: auto;
  background-color: black;
  color: white;
}
.first-sec {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.foot-sec1 {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 2rem;
}
.foot-img {
  width: 14rem;
  height: auto;
  margin-top: 2rem;
}
.social-icons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.icons {
  width: 2rem;
  width: 2rem;
  margin-right: 0.56rem;
}

.icons:hover {
  transform: scale(1.1);
}

.first-sec-txt {
  width: 16rem;
  height: auto;
  font-size: 1.05rem;
  flex-wrap: break-word;
}
#sec2 {
  margin-top: 2rem;
}

.sec2-header {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(245, 71, 72);
}
.page-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.pages {
  font-size: 1.05rem;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-align: justify;
  margin-left: 0.3rem;
}

.pages:hover {
  color: rgb(245, 71, 72);
  cursor: pointer;
  transform: scale(1.1);
}
.info {
  width: 18rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-align: justify;
  flex-wrap: wrap;
}
#sec3 {
  margin-top: 2rem;
  margin-left: 1.5rem;
}
#sec4 {
  margin-top: 2rem;
  margin-right: 2rem;
}
.info-get {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.me {
  font-size: 1.05rem;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-align: center;
  margin-top: 2rem;
}
</style>
