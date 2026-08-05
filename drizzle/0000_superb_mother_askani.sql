CREATE TABLE `crawler_hits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_date` text NOT NULL,
	`crawler` text NOT NULL,
	`path` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_crawler_hits_event_date` ON `crawler_hits` (`event_date`);--> statement-breakpoint
CREATE INDEX `idx_crawler_hits_event_date_crawler` ON `crawler_hits` (`event_date`,`crawler`);--> statement-breakpoint
CREATE TABLE `interaction_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_date` text NOT NULL,
	`path` text NOT NULL,
	`visitor_hash` text NOT NULL,
	`is_internal` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_interactions_event_date` ON `interaction_events` (`event_date`);--> statement-breakpoint
CREATE INDEX `idx_interactions_event_date_path` ON `interaction_events` (`event_date`,`path`);--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_date` text NOT NULL,
	`path` text NOT NULL,
	`referrer_host` text DEFAULT '' NOT NULL,
	`source_channel` text DEFAULT '' NOT NULL,
	`visitor_hash` text NOT NULL,
	`is_internal` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_page_views_event_date` ON `page_views` (`event_date`);--> statement-breakpoint
CREATE INDEX `idx_page_views_event_date_path` ON `page_views` (`event_date`,`path`);--> statement-breakpoint
CREATE INDEX `idx_page_views_event_date_source` ON `page_views` (`event_date`,`source_channel`);