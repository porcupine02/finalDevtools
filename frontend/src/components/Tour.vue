<script setup>
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/vue'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserCircleIcon, CheckIcon } from '@heroicons/vue/20/solid'


const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
]

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const products2 = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://media.timeout.com/images/105240236/1372/772/image.webp',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    //   {
    //     id: 2,
    //     name: 'Basic Tee',
    //     href: '#',
    //     imageSrc: 'https://media.timeout.com/images/105240236/1372/772/image.webp',
    //     imageAlt: "Front of men's Basic Tee in black.",
    //     price: '$35',
    //     color: 'Black',
    //   },
    //   {
    //     id: 3,
    //     name: 'Basic Tee',
    //     href: '#',
    //     imageSrc: 'https://media.timeout.com/images/105240236/1372/772/image.webp',
    //     imageAlt: "Front of men's Basic Tee in black.",
    //     price: '$35',
    //     color: 'Black',
    //   },
    // More products...
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const mobileMenuOpen = ref(false)
</script>

<template>
    <div>
        <div class="m-6">


            <div v-for="product in products2" :key="product.id" class="group relative">
                <div
                    class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img :src="product.imageSrc" :alt="product.imageAlt"
                        class="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-2xl" />
                </div>
                <div class="bg-lightgreen rounded-2xl p-4 my-4 grid grid-cols-1 gap-x-6 gap-y-4 ">
                    <h2 class=" text-2xl font-bold tracking-tight text-gray-900">เที่ยว</h2>
                    <div class="mt-1 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <a :href="product.href">
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ product.name }}
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dictum sapien non
                        efficitur. In porttitor dignissim justo. Curabitur elit tellus, consectetur ac lorem non,
                        imperdiet accumsan risus. Fusce et vehicula mauris, at aliquet lacus. Donec in sapien pretium
                        risus accumsan pretium et non orci. Aliquam consequat augue in tincidunt efficitur. Nullam
                        semper est velit, at suscipit ipsum rutrum ut. Duis cursus feugiat facilisis. Mauris nec
                        condimentum mi, in ornare orci. Fusce quis aliquet odio. Fusce elit diam, laoreet et mi sit
                        amet, vehicula ultrices neque.
                    </div>
                    <a href="#"
                        class="mt-10 block w-full rounded-md bg-darkgreen px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save a Trip</a>
                </div>
            </div>
            <!-- </div> -->
            <!-- </div> -->


        </div>
        <!-- <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl sm:text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam.
            Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div class="p-8 sm:p-10 lg:flex-auto">
            <h3 class="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
            <p class="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit.
              Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
            <div class="mt-10 flex items-center gap-x-4">
              <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
              <div class="h-px flex-auto bg-gray-100" />
            </div>
            <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              <li v-for="feature in includedFeatures" :key="feature" class="flex gap-x-3">
                <CheckIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ feature }}
              </li>
            </ul>
          </div>
          <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div
              class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div class="mx-auto max-w-xs px-8">
                <p class="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                <p class="mt-6 flex items-baseline justify-center gap-x-2">
                  <span class="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                  <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a href="#"
                  class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get
                  access</a>
                <p class="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company
                  reimbursement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
        <!-- <div> -->


    </div>
</template>


<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
