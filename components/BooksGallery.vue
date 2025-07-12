<template>
    <div class="book-gallery">
        <h1 class="gallery-title">Read/Watch List</h1>
        <div class="book-grid">
            <div v-for="book in books" :key="book.id" class="book-card"
                :class="{ 'expanded': expandedCard === book.id }" @click="toggleCard(book.id)">
                <div class="book-compact" v-show="expandedCard !== book.id">
                    <div class="book-cover">
                        <NuxtImg :src="book.coverImage" alt="`Cover of ${book.title}`" class="cover-image" />
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">{{ book.title }}</h3>
                        <p class="book-author">{{ book.author }}</p>
                        <div class="book-genre">{{ book.genre }}</div>
                        <div class="book-rating">
                            <span class="stars">
                                <span v-for="star in 5" :key="star" class="star"
                                    :class="{ 'filled': star <= book.rating }">★</span>
                            </span>
                            <span class="rating-text">{{ book.rating }}/5</span>
                        </div>
                    </div>
                </div>

                <div class="book-expanded" v-show="expandedCard === book.id">
                    <div class="expanded-header">
                        <button class="close-btn" @click.stop="closeCard">×</button>
                        <div class="expanded-cover">
                            <NuxtImg :src="book.coverImage" alt="`Cover of ${book.title}`"
                                class="expanded-cover-image" />
                        </div>
                        <div class="expanded-basic-info">
                            <h3 class="expanded-title">{{ book.title }}</h3>
                            <p class="expanded-author">{{ book.author }}</p>
                            <div class="expanded-genre">{{ book.genre }}</div>
                            <div class="expanded-rating">
                                <span class="stars">
                                    <span v-for="star in 5" :key="star" class="star"
                                        :class="{ 'filled': star <= book.rating }">★</span>
                                </span>
                                <span class="rating-text">{{ book.rating }}/5</span>
                            </div>
                        </div>
                    </div>

                    <div class="expanded-content">
                        <div class="description-section">
                            <h4>Description</h4>
                            <p>{{ book.description }}</p>
                        </div>

                        <div class="thoughts-section">
                            <h4>My Thoughts</h4>
                            <p>{{ book.myThoughts }}</p>
                        </div>

                        <div class="links-section" v-if="book.links && book.links.length > 0">
                            <h4>Links</h4>
                            <div class="links-grid">
                                <a v-for="link in book.links" :key="link.title" :href="link.url" target="_blank"
                                    rel="noopener noreferrer" class="book-link">
                                    <span class="link-title">{{ link.title }}</span>
                                    <span class="link-icon">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="expandedCard !== null" class="backdrop" @click="closeCard"></div>
    </div>
</template>

<script setup>
import { NuxtImg } from '#components'

const expandedCard = ref(null)

const books = ref([
    {
        id: 1,
        title: "We Never Learn",
        author: "Taishi Tsutsui",
        genre: "Rom-Com",
        description: "To receive a prestigious scholarship covering all university tuition fees, third-year high school student Nariyuki Yui is put in charge of tutoring his two star classmates.",
        myThoughts: "Better than The Quintessential Quintuplets, and that's saying something",
        rating: 5,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/We_never_learn_%28manga%29.jpg/250px-We_never_learn_%28manga%29.jpg",
        links: [
            { title: "Wikipedia", url: "https://en.wikipedia.org/wiki/We_Never_Learn" }
        ]
    },
    {
        id: 2,
        title: "ファイト一発!充電ちゃん!!",
        author: "Bow Ditama",
        genre: "Comedy",
        rating: 5,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Fight_Ippatsu%21_Juuden-chan%21%21_Vol._1.jpg/250px-Fight_Ippatsu%21_Juuden-chan%21%21_Vol._1.jpg",
        description: "Meet Plug, an unusual girl from a parallel world. Plug is a \"Juuden-chan,\" capable of \"recharging\" people down on their luck, spreading good cheer wherever she goes!",
        myThoughts: "Invisible ladies cure depression by fucking electrocuting people. What's not to love about it",
        links: [
            { title: "Wikipedia", url: "https://en.wikipedia.org/wiki/Juden_Chan" },
        ]
    },
    {
        id: 3,
        title: "One Piece",
        author: "Eiichiro Oda",
        genre: "Fiction",
        rating: 500000,
        coverImage: "https://wallpapers.com/images/hd/monkey-d-luffy-one-piece-character-ncbn2w69dzvewvem.jpg",
        description: "Fictional pirates overthrow corrupt establishments because one of the victims gave Luffy a half-eaten McNugget",
        myThoughts: "This is by far the peak of fiction in a very objective sense. This is not an opinion, it's a fact",
        links: [
            { title: "Wikipedia", url: "https://en.wikipedia.org/wiki/One_Piece" }
        ]
    },
])

const toggleCard = (bookId) => {
    expandedCard.value = expandedCard.value === bookId ? null : bookId
}

const closeCard = () => {
    expandedCard.value = null
}

onMounted(() => {
    const handleEscape = (event) => {
        if (event.key === 'Escape') {
            closeCard()
        }
    }
    document.addEventListener('keydown', handleEscape)

    onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
    })
})
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    background: #191724;
    color: #e0def4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

* {
    box-sizing: border-box;
}

:root {
    --rp-base: #191724;
    --rp-surface: #1f1d2e;
    --rp-overlay: #26233a;
    --rp-muted: #6e6a86;
    --rp-subtle: #908caa;
    --rp-text: #e0def4;
    --rp-love: #eb6f92;
    --rp-gold: #f6c177;
    --rp-rose: #ebbcba;
    --rp-pine: #31748f;
    --rp-foam: #9ccfd8;
    --rp-iris: #c4a7e7;
    --rp-highlight-low: #21202e;
    --rp-highlight-med: #403d52;
    --rp-highlight-high: #524f67;
}

.book-gallery {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    background: var(--rp-base);
    min-height: 100vh;
}

.gallery-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: var(--rp-text);
    font-weight: 300;
}

.book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    justify-items: center;
}

.book-card {
    background: var(--rp-surface);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 260px;
    cursor: pointer;
    position: relative;
    border: 1px solid var(--rp-highlight-low);
}

.book-card:hover:not(.expanded) {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    border-color: var(--rp-highlight-med);
}

.book-card.expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
    border-color: var(--rp-highlight-high);
}

.book-cover {
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.book-card:hover:not(.expanded) .cover-image {
    transform: scale(1.05);
}

.book-info {
    padding: 1.5rem;
}

.book-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--rp-text);
    line-height: 1.4;
}

.book-author {
    color: var(--rp-subtle);
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    font-style: italic;
}

.book-genre {
    background: var(--rp-pine);
    color: var(--rp-text);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    display: inline-block;
    margin-bottom: 0.75rem;
    font-weight: 500;
}

.book-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.stars {
    display: flex;
    gap: 0.1rem;
}

.star {
    color: var(--rp-muted);
    font-size: 1.2rem;
    transition: color 0.2s ease;
}

.star.filled {
    color: var(--rp-gold);
}

.rating-text {
    font-size: 0.9rem;
    color: var(--rp-subtle);
}

.expanded-header {
    display: flex;
    gap: 1.5rem;
    padding: 2rem;
    position: relative;
    background: var(--rp-surface);
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--rp-muted);
    transition: color 0.2s ease;
    z-index: 10;
}

.close-btn:hover {
    color: var(--rp-love);
}

.expanded-cover {
    flex-shrink: 0;
    width: 200px;
    height: 280px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.expanded-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.expanded-basic-info {
    flex: 1;
    padding-top: 1rem;
}

.expanded-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--rp-text);
}

.expanded-author {
    color: var(--rp-subtle);
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    font-style: italic;
}

.expanded-genre {
    background: var(--rp-pine);
    color: var(--rp-text);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    display: inline-block;
    margin-bottom: 1rem;
    font-weight: 500;
}

.expanded-rating {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.expanded-rating .stars {
    gap: 0.2rem;
}

.expanded-rating .star {
    font-size: 1.5rem;
}

.expanded-content {
    padding: 0 2rem 2rem;
    background: var(--rp-surface);
}

.expanded-content h4 {
    color: var(--rp-rose);
    margin: 1.5rem 0 1rem 0;
    font-size: 1.3rem;
    font-weight: 600;
}

.expanded-content p {
    color: var(--rp-text);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.description-section {
    border-bottom: 1px solid var(--rp-highlight-low);
    padding-bottom: 1.5rem;
}

.thoughts-section {
    border-bottom: 1px solid var(--rp-highlight-low);
    padding-bottom: 1.5rem;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.book-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: var(--rp-overlay);
    border-radius: 8px;
    text-decoration: none;
    color: var(--rp-text);
    transition: all 0.2s ease;
    border: 1px solid var(--rp-highlight-low);
}

.book-link:hover {
    background: var(--rp-highlight-med);
    transform: translateY(-1px);
    border-color: var(--rp-foam);
}

.link-title {
    font-weight: 500;
    color: var(--rp-text);
}

.link-icon {
    font-size: 1.2rem;
    color: var(--rp-foam);
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(25, 23, 36, 0.8);
    z-index: 999;
    backdrop-filter: blur(4px);
}

@media (max-width: 768px) {
    .book-gallery {
        padding: 1rem;
    }

    .gallery-title {
        font-size: 2rem;
    }

    .book-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.5rem;
    }

    .book-cover {
        height: 250px;
    }

    .book-card.expanded {
        width: 95vw;
        max-height: 95vh;
    }

    .expanded-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .expanded-cover {
        width: 150px;
        height: 210px;
    }

    .expanded-title {
        font-size: 1.5rem;
    }

    .expanded-content {
        padding: 0 1rem 1rem;
    }
}

@media (max-width: 480px) {
    .book-grid {
        grid-template-columns: 1fr;
    }

    .book-card {
        max-width: 100%;
    }

    .links-grid {
        grid-template-columns: 1fr;
    }
}

.book-card.expanded::-webkit-scrollbar {
    width: 8px;
}

.book-card.expanded::-webkit-scrollbar-track {
    background: var(--rp-surface);
}

.book-card.expanded::-webkit-scrollbar-thumb {
    background: var(--rp-muted);
    border-radius: 4px;
}

.book-card.expanded::-webkit-scrollbar-thumb:hover {
    background: var(--rp-subtle);
}
</style>