<template>
    <div class="footer-cont">
        <div class="developer-text">
            <h4>Developed by Walter Partera - Full Stack Developer.</h4>
            <div class="social-media">
                <a href="#" @click="copyEmail" class="fa fa-envelope" style="font-size:28px; color:white;  text-decoration:none"></a>
                <a href="https://www.linkedin.com/in/walter-alejandro-partera-40540b273/" class="fa fa-linkedin-square" style="font-size:28px; color:white;  text-decoration:none"></a>
            </div>
        </div>

        <div class="design-text">
            <h4>Designed by Marian Carrero - UI/UX Designer   .</h4>
            <div class="social-media">
                <a href="#" @click="copyEmaiMarian" class="fa fa-envelope" style="font-size:28px; color:white;  text-decoration:none"></a>
                <a href="" class="fa fa-linkedin-square" style="font-size:28px; color:white;  text-decoration:none"></a>
            </div>
        </div>

        <h5 class="text-property">All images and names used do not belong to us. They are registered to their respective
            owners.</h5>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    methods: {
        copyEmail(event) {
            event.preventDefault();
            navigator.clipboard.writeText('walterpartera23@gmail.com');
            this.$toast.success(`Email copied!`);
        },

        copyEmaiMarian(event) {
            event.preventDefault();
            navigator.clipboard.writeText('carerromarian29@gmail.com');
            this.$toast.success(`Email copied!`);
        }
    }
}
</script>

<style>
.footer-cont {
    width: 1510px;
    height: 200px;
    background-color: #1e1e1e;
}

.developer-text {
    color: white;
    display: flex;
    justify-content: flex-start;
    margin-left: 30px;

}

.design-text {
    color: white;
    display: flex;
    justify-content: flex-start;
    margin-left: 30px;
}

.text-property {
    color: white;
    margin-left: 30px;
}

.social-media {
    margin-top: 15px;
}
.social-media a {
    margin: 0 15px;
}

</style>