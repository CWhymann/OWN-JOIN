import { Component, model, signal } from '@angular/core';

@Component({
    selector: 'app-subtask-list',
    standalone: true,
    imports: [],
    templateUrl: './subtask-list.html',
    styleUrl: './subtask-list.scss',
})
export class SubtaskList {
    readonly subtasks = model<string[]>([]);

    protected readonly draft = signal('');
    protected readonly shake = signal(false);
    protected readonly editingDraft = signal('');
    protected readonly editingIndex = signal(-1);

    reset(): void {
        this.draft.set('');
        this.editingIndex.set(-1);
    }

    protected onDraftInput(event: Event): void {
        this.draft.set((event.target as HTMLInputElement).value);
    }

    protected add(event?: Event): void {
        event?.preventDefault();
        const value = this.draft().trim();

        if (!value) {
            this.triggerShake();
            return;
        }

        this.subtasks.update((items) => [...items, value]);
        this.draft.set('');
    }

    protected clearDraft(): void {
        this.draft.set('');
    }

    protected remove(index: number): void {
        this.subtasks.update((items) => items.filter((_, position) => position !== index));
        this.editingIndex.set(-1);
    }

    protected startEditing(index: number): void {
        if (this.editingIndex() === index) {
            return;
        }

        this.editingIndex.set(index);
        this.editingDraft.set(this.subtasks()[index]);
    }

    protected onEditingInput(event: Event): void {
        this.editingDraft.set((event.target as HTMLInputElement).value);
    }

    protected save(event?: Event): void {
        event?.preventDefault();
        const value = this.editingDraft().trim();

        if (!value) {
            return;
        }

        const index = this.editingIndex();
        this.subtasks.update((items) =>
            items.map((item, position) => (position === index ? value : item)),
        );
        this.editingIndex.set(-1);
    }

    private triggerShake(): void {
        this.shake.set(true);
        setTimeout(() => this.shake.set(false), 400);
    }
}
