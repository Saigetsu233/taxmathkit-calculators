ALTER TABLE `interaction_events` ADD `event_type` text DEFAULT 'calculation_completed' NOT NULL;--> statement-breakpoint
ALTER TABLE `interaction_events` ADD `event_label` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `interaction_events` ADD `source_host` text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_interactions_event_type` ON `interaction_events` (`event_date`,`event_type`);