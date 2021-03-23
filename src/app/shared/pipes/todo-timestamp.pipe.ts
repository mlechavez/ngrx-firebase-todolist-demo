import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoTimestamp',
})
export class TodoTimestampPipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(
    value: any,
    format?: string,
    timezone?: string,
    locale?: string
  ): string {
    try {
      const date = value.toDate();
      return super.transform(date, format, timezone, locale);
    } catch (error) {
      return super.transform(value, format, timezone, locale);
    }
  }
}
