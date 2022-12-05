(outPutFilem, engine='xlsxwriter') as writer:
#     for column in auditResult:
#         column_width = max(auditResult[column].astype(
#             str).map(len).max(), len(column))
#         col_idx = auditResult.columns.get_loc(column)
#         writer.set_column(col_idx, col_idx, column_width)
#     auditResult.to_