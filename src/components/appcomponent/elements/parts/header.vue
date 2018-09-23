<template>
  

    

     <header>
        <Navbar /> <!--Getting Nav-->

  
    <hgroup >

                                                  
            <h1>Shop<strong>Yo</strong></h1>  
            <span>Laravel & VueJS Based</span>

            
                
                
    </hgroup>


    <Loading />

    </header>
</template>


<script>
import Navbar from "@/components/appcomponent/elements/parts/Navbar.vue";
import Loading from '@/components/appcomponent/elements/parts/spinner.vue';

export default {
    name:'Header',
    components:{
        Navbar,Loading
    }
}
</script>