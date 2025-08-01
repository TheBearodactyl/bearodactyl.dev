<script lang="ts">
    import type { Game } from "$lib/types";
    import { isPeakFiction } from "$lib/utils/misc";
    import BaseCard from "../gallery/BaseCard.svelte";
    import WarningIcon from "../icons/WarningIcon.svelte";
    import { _ } from "svelte-i18n";

    interface Props {
        game: Game;
        index: number;
        isExpanded: boolean;
        viewMode: string;
        onToggleCard: () => void;
    }

    let { game, index, isExpanded, viewMode, onToggleCard }: Props = $props();
</script>

<BaseCard
    {index}
    expanded={isExpanded}
    {viewMode}
    explicit={game.explicit}
    cardClasses={{ "explicit-content": game.explicit }}
    ontoggle={onToggleCard}
>
    {#if !isExpanded}
        {#if viewMode === "list"}
            <div class="book-list-item">
                <div class="book-cover-small">
                    <img
                        src={game.coverImage}
                        alt={$_("gallery.book.cover-alt", { values: { title: game.title } })}
                        class="cover-image-small"
                    />
                    {#if game.explicit}
                        <div class="explicit-icon-small">
                            <WarningIcon />
                        </div>
                    {/if}
                </div>
                <div class="book-details">
                    <div class="book-primary-info">
                        <h3 class="book-title-list">{game.title}</h3>
                        <p class="book-author-list">{game.developer}</p>
                    </div>
                    <div class="book-meta">
                        <div class="book-rating-list">
                            <span class="stars-small">
                                {#each Array(isPeakFiction(game) ? 50 : 5) as _, star}
                                    <span class="star-small" class:filled={star + 1 <= game.rating}
                                        >★</span
                                    >
                                {/each}
                            </span>
                        </div>
                        <div class="read-status-list">{game.status}</div>
                    </div>
                    <div class="book-genres-list">
                        {#each game.genres.slice(0, 3) as genre (genre)}
                            <span class="book-genre-small">{genre}</span>
                        {/each}
                    </div>
                </div>
            </div>
        {:else}
            <div class="book-compact">
                <div class="book-cover">
                    <img
                        src={game.coverImage}
                        alt={$_("gallery.book.cover-alt", { values: { title: game.title } })}
                        class="cover-image"
                    />
                    {#if game.explicit}
                        <div class="explicit-icon">
                            <span class="icon-warning">
                                <WarningIcon />
                            </span>
                            <span class="explicit-label">{$_("gallery.explicit")}</span>
                        </div>
                    {/if}
                </div>
                <div class="book-info">
                    <h3 class="book-title">{game.title}</h3>
                    <p class="book-author">{game.developer}</p>
                    <div class="read-status">{game.status}</div>
                    <div class="book-genres">
                        {#each game.genres.slice(0, 5) as genre (genre)}
                            <span class="book-genre">{genre}</span>
                        {/each}
                    </div>
                    {#if game.tags}
                        <div class="book-tags">
                            {#each game.tags.slice(0, 5) as tag (tag)}
                                <span class="book-tag">{tag}</span>
                            {/each}
                        </div>
                    {/if}
                    <div class="book-rating">
                        <span class="stars">
                            {#each Array(isPeakFiction(game) ? 50 : 5) as _, star}
                                <span class="star" class:filled={star + 1 <= game.rating}>★</span>
                            {/each}
                        </span>
                        <span class="rating-text">
                            {$_("gallery.book.rating-out-of-five", { values: { rating: game.rating } })}
                        </span>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</BaseCard>
